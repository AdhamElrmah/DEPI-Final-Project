import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getAllReviews, deleteReview } from "../../lib/getReviews";
import { Button } from "../UI/button";
import ConfirmDialog from "../UI/ConfirmDialog";
import LoaderSpinner from "../../layouts/LoaderSpinner";
import StarRating from "../UI/StarRating";

export default function ReviewsManagement() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getAllReviews(currentPage, 10, user.token);
      setReviews(data.reviews);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setMessage({ type: "error", text: "Failed to fetch reviews" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!reviewToDelete) return;

    try {
      await deleteReview(reviewToDelete._id || reviewToDelete.id, user.token);
      setMessage({ type: "success", text: "Review deleted successfully" });
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      setMessage({ type: "error", text: "Failed to delete review" });
    } finally {
      setConfirmOpen(false);
      setReviewToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-6">Manage Reviews</h3>

      {message && (
        <div
          className={`p-4 mb-4 rounded-md ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-4 font-medium text-gray-600">Car</th>
                  <th className="p-4 font-medium text-gray-600">User</th>
                  <th className="p-4 font-medium text-gray-600">Rating</th>
                  <th className="p-4 font-medium text-gray-600">Comment</th>
                  <th className="p-4 font-medium text-gray-600">Date</th>
                  <th className="p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review._id || review.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <span className="font-medium text-gray-900">
                          {review.carId}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{review.username}</td>
                      <td className="p-4">
                        <StarRating rating={review.rating} readonly size="w-4 h-4" />
                      </td>
                      <td className="p-4 text-gray-600 max-w-xs truncate">
                        {review.comment || "-"}
                      </td>
                      <td className="p-4 text-gray-600 text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(review)}
                          className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {currentPage} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === pagination.pages}
                onClick={() => setCurrentPage((p) => Math.min(pagination.pages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        title="Delete Review"
        description="Are you sure you want to delete this review? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
