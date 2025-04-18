import React, { useState } from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import ShareSheetModal from "../ShareSheetModal";
import CommentModal from "../CommentModal";
import FavoritesModal from "../FavoritesModal";
import GenerateRecordModal from "../GenerateRecord"; 

const PropertyDetailHeader = ({propertyId,onGenerateRecord }) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showGenerateRecordModal, setShowGenerateRecordModal] = useState(false);
  
  return (
    <div className="property-detail-header container-fluid">
      <div className="row">
        <div className="col d-flex align-items-center justify-content-end flex-wrap gap-3">
          <ShareSheetModal />

          <div className="icon-text" onClick={() => setShowCommentModal(true)} style={{ cursor: "pointer" }}>
            <FaComment className="icon" />
            <span>Add Comment</span>
          </div>

          <div 
            className="icon-text" 
            onClick={() => setShowFavoritesModal(true)} 
            style={{ cursor: "pointer" }}
          >
            <FaHeart className="icon" />
            <span>Favorite</span>
          </div>

          <button 
            className="btn btn-success btn-generate"
            onClick={() => setShowGenerateRecordModal(true)}
          >
            Generate Record
          </button>
        </div>
      </div>
      
      {/* Modals */}
      <CommentModal show={showCommentModal} handleClose={() => setShowCommentModal(false)} />
      <FavoritesModal productId={propertyId} show={showFavoritesModal} handleClose={() => setShowFavoritesModal(false)} />
      <GenerateRecordModal 
        show={showGenerateRecordModal} 
        handleClose={() => setShowGenerateRecordModal(false)}
        onGenerate={onGenerateRecord}  // Pass the callback
      />
    </div>
  );
};

export default PropertyDetailHeader;