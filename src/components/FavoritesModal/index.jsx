import React, { useState, useEffect } from "react";
import { FaFolderPlus, FaSearch, FaTimes, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const FavoritesModal = ({ show, handleClose, productId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load folders from localStorage on modal open
  useEffect(() => {
    if (show) {
      loadFolders();
    }
  }, [show]);

  const loadFolders = () => {
    setIsLoading(true);
    try {
      const savedFolders = localStorage.getItem("userFolders");
      const defaultFolders = [
        { id: "default", name: "Default" },
        { id: "wishlist", name: "Wishlist" }
      ];
      
      const loadedFolders = savedFolders 
        ? JSON.parse(savedFolders) 
        : defaultFolders;
      
      setFolders(loadedFolders);
      setSelectedFolder(loadedFolders[0]?.id || null);
    } catch (error) {
      toast.error("Error loading folders");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFoldersToStorage = (foldersToSave) => {
    localStorage.setItem("userFolders", JSON.stringify(foldersToSave));
  };

  const handleSaveToFavorites = async () => {
    if (!selectedFolder) {
      toast.warning("Please select a folder");
      return;
    }

    setIsSaving(true);
    try {
      const userId = localStorage.getItem("user_id");
      const response = await fetch(
        `https://apis.geoestate.ai/api/UserFavoritesProperty/${userId}/product/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            folderName: folders.find(f => f.id === selectedFolder)?.name || "Default",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to save to favorites");

      toast.success("Saved to favorites successfully!");
      handleClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast.warning("Please enter a folder name");
      return;
    }

    try {
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: newFolderName.trim()
      };
      
      const updatedFolders = [...folders, newFolder];
      setFolders(updatedFolders);
      saveFoldersToStorage(updatedFolders);
      setSelectedFolder(newFolder.id);
      setNewFolderName("");
      setShowNewFolderInput(false);
      toast.success("Folder created successfully!");
    } catch (error) {
      toast.error("Error creating folder");
      console.error(error);
    }
  };

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!show) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
      }}
    >
      <div
        className="modal-content bg-white"
        style={{
          width: "90%",
          maxWidth: "550px",
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        {/* ... (rest of the JSX remains the same, just remove the API-related loading states) ... */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="m-0" style={{ color: "#444", fontWeight: "500" }}>
            Save to favorites
          </h4>
          <button
            onClick={handleClose}
            className="btn border-0"
            style={{ color: "#666", fontSize: "1.5rem" }}
            disabled={isSaving}
          >
            <FaTimes />
          </button>
        </div>

        <div className="position-relative mb-4">
          <FaSearch
            style={{
              position: "absolute",
              left: "12px",
              top: "12px",
              color: "#aaa",
              zIndex: 1,
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search folder"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              paddingLeft: "40px",
              height: "45px",
              borderColor: "#ddd",
            }}
            disabled={isSaving}
          />
        </div>

        <div
          className="folder-list mb-4"
          style={{ maxHeight: "250px", overflowY: "auto" }}
        >
          {filteredFolders.length === 0 ? (
            <div className="text-center py-4">
              <p>No folders found</p>
            </div>
          ) : (
            filteredFolders.map((folder) => (
              <div
                key={folder.id}
                className="form-check d-flex align-items-center p-2 hover-bg"
                style={{
                  backgroundColor:
                    selectedFolder === folder.id ? "#f0f8ff" : "transparent",
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="folderSelection"
                  id={`folder-${folder.id}`}
                  checked={selectedFolder === folder.id}
                  onChange={() => setSelectedFolder(folder.id)}
                  style={{
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  disabled={isSaving}
                />
                <label
                  className="form-check-label w-100"
                  htmlFor={`folder-${folder.id}`}
                  style={{ cursor: "pointer" }}
                >
                  {folder.name}
                </label>
              </div>
            ))
          )}

          {showNewFolderInput && (
            <div className="d-flex align-items-center p-2 gap-2 mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                style={{
                  height: "38px",
                  borderColor: "#ddd",
                }}
                autoFocus
              />
              <button
                className="btn btn-success"
                onClick={handleCreateFolder}
                style={{
                  padding: "8px 12px",
                  minWidth: "80px",
                }}
              >
                Save
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowNewFolderInput(false)}
                style={{
                  padding: "8px 12px",
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-success d-flex align-items-center gap-2"
            style={{
              borderColor: "#4caf50",
              color: "#4caf50",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
            onClick={() => setShowNewFolderInput(true)}
            disabled={isSaving || showNewFolderInput}
          >
            <FaFolderPlus />
            <span>New folder</span>
          </button>

          <button
            className="btn btn-success d-flex align-items-center justify-content-center"
            onClick={handleSaveToFavorites}
            style={{
              backgroundColor: "#4caf50",
              border: "none",
              padding: "8px 24px",
              borderRadius: "4px",
              minWidth: "100px",
            }}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <FaSpinner className="fa-spin me-2" />
                Saving...
              </>
            ) : (
              "KEEP"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;