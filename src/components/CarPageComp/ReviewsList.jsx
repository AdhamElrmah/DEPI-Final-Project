import React, { useState, useEffect } from "react";
import StarRating from "../UI/StarRating";
import { Button } from "../UI/button";
import { useAuth } from "../../contexts/AuthContext";

export default function ReviewsList({ carId, reviews = [], stats = null, onDelete, onEdit }) {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;

  // Calculate pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isOwner = (review) => {
    if (!user) return false;
    const userId = user.id || user._id;
    const reviewUserId = review.userId?._id || review.userId;
    return userId?.toString() === reviewUserId?.toString();
  };

  const canDelete = (review) => {
    return isOwner(review) || user?.role === "admin";
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">No reviews yet. Be the first to review this car!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Overall Stats */}
      {stats && stats.count > 0 && (
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="text-4xl font-bold">{stats.average.toFixed(1)}</div>
          <div>
            <StarRating rating={stats.average} readonly size="lg" showNumber={false} />
            <p className="text-sm text-gray-600 mt-1">
              Based on {stats.count} {stats.count === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {currentReviews.map((review) => (
          <div
            key={review._id || review.id}
            className="bg-white border rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{review.username}</span>
                  <StarRating rating={review.rating} readonly size="sm" showNumber={false} />
                </div>
                <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
              </div>

              {/* Edit/Delete Buttons */}
              {(isOwner(review) || user?.role === "admin") && (
                <div className="flex gap-2">
                  {/* Only owner can edit */}
                  {onEdit && isOwner(review) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(review)}
                      className="text-xs"
                    >
                      Edit
                    </Button>
                  )}
                  {/* Owner and admin can delete */}
                  {onDelete && canDelete(review) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(review._id || review.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Comment */}
            {review.comment && (
              <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
