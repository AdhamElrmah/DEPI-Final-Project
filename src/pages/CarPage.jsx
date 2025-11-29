import CarDetials from "@/components/CarPageComp/CarDetials";
import ExploreSimilarCars from "@/components/CarPageComp/ExploreSimilarCars";
import ReviewForm from "@/components/CarPageComp/ReviewForm";
import ReviewsList from "@/components/CarPageComp/ReviewsList";
import Testimonials from "@/layouts/Testimonials";
import ConfirmDialog from "@/components/UI/ConfirmDialog";
import React, { useState, useEffect } from "react";
import { Navigate, useLoaderData, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  getCarReviews,
  createReview,
  updateReview,
  deleteReview,
  checkReviewEligibility,
} from "@/lib/getReviews";

function CarPage() {
  const car = useLoaderData();
  const { user } = useAuth(); // Token is inside user object
  const token = user?.token; // Extract token from user
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [canReview, setCanReview] = useState(false);
  const [existingReview, setExistingReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Scroll to reviews if hash is present
  useEffect(() => {
    if (location.hash === "#reviews") {
      const element = document.getElementById("reviews");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // Fetch reviews
  useEffect(() => {
    if (car) {
      loadReviews();
      if (user && token) {
        checkEligibility();
      }
    }
  }, [car, user]);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const data = await getCarReviews(car.id);
      setReviews(data.reviews || []);
      setReviewStats(data.stats || null);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkEligibility = async () => {
    try {
      const data = await checkReviewEligibility(car.id, token);
      setCanReview(data.canReview);
      setExistingReview(data.existingReview);
      setShowReviewForm(data.canReview);
    } catch (error) {
      console.error("Error checking review eligibility:", error);
    }
  };

  const handleSubmitReview = async ({ rating, comment }) => {
    try {
      if (existingReview) {
        await updateReview(existingReview._id || existingReview.id, rating, comment, token);
      } else {
        await createReview(car.id, rating, comment, token);
      }
      await loadReviews();
      setShowReviewForm(false);
      // Refresh eligibility
      if (user && token) {
        await checkEligibility();
      }
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to submit review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    setReviewToDelete(reviewId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!reviewToDelete) return;
    
    try {
      await deleteReview(reviewToDelete, token);
      await loadReviews();
      // Refresh eligibility
      if (user && token) {
        await checkEligibility();
      }
      setReviewToDelete(null);
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  const handleEditReview = (review) => {
    setExistingReview(review);
    setShowReviewForm(true);
  };

  if (!car) {
    return (
      <>
        <div>Car not found, redirecting to cars page...</div>
        {Navigate({ to: "/cars" })}
      </>
    );
  }

  return (
    <>
      <CarDetials car={car} reviewStats={reviewStats} />

      {/* Reviews Section */}
      <section id="reviews" className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 pb-4">Customer Reviews</h2>



        {/* Review Form */}
        {user && (canReview || existingReview) && showReviewForm && (
          <div className="mb-8">
            <ReviewForm
              carId={car.id}
              onSubmit={handleSubmitReview}
              onCancel={() => setShowReviewForm(false)}
              existingReview={existingReview}
            />
          </div>
        )}

        {/* Show button to write review if eligible but form is hidden */}
        {user && canReview && !showReviewForm && !existingReview && (
          <div className="mb-8">
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Write a Review
            </button>
          </div>
        )}

        {/* Reviews List */}
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        ) : (
          <ReviewsList
            carId={car.id}
            reviews={reviews}
            stats={reviewStats}
            onDelete={handleDeleteReview}
            onEdit={handleEditReview}
          />
        )}
      </section>

      <ExploreSimilarCars currentCar={car} />
      <Testimonials />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        title="Delete Review"
        description="Are you sure you want to delete this review? This action cannot be undone."
        onConfirm={confirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}

export default CarPage;
