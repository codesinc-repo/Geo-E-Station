// MapDrawingManager.jsx
import React, { useEffect } from "react";

const MapDrawingManager = ({ 
  mapRef, 
  isActive, 
  onPolygonComplete, 
  onDrawingModeChanged,
  setDrawingManagerRef 
}) => {
  
  useEffect(() => {
    // Only create drawing manager when needed and if map is loaded
    if (isActive && mapRef && mapRef.current && window.google) {
      try {
        // Set cursor for drawing mode
        mapRef.current.setOptions({
          draggableCursor: 'crosshair',
          draggingCursor: 'crosshair'
        });
        
        // Create new drawing manager
        const drawingManager = new window.google.maps.drawing.DrawingManager({
          drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
          drawingControl: false,
          polygonOptions: {
            fillColor: "#FF0000",
            fillOpacity: 0.3,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            zIndex: 1
          }
        });
        
        // Set the drawing manager on the map
        drawingManager.setMap(mapRef.current);
        
        // Store reference to drawing manager for parent component
        if (setDrawingManagerRef) {
          setDrawingManagerRef(drawingManager);
        }
        
        // Set up listener for polygon completion
        const polygonCompleteListener = window.google.maps.event.addListener(
          drawingManager, 
          "polygoncomplete", 
          (polygon) => {
            // Turn off drawing mode
            drawingManager.setDrawingMode(null);
            
            // Reset cursor
            if (mapRef.current) {
              mapRef.current.setOptions({
                draggableCursor: 'default',
                draggingCursor: 'grab'
              });
            }
            
            // Call the onPolygonComplete callback
            if (onPolygonComplete) {
              onPolygonComplete(polygon);
            }
            
            // Notify parent that drawing mode has changed
            if (onDrawingModeChanged) {
              onDrawingModeChanged(false);
            }
          }
        );
        
        // Notify parent that drawing mode is active
        if (onDrawingModeChanged) {
          onDrawingModeChanged(true);
        }
        
        // Clean up function
        return () => {
          // Remove event listener
          window.google.maps.event.removeListener(polygonCompleteListener);
          
          // Remove drawing manager from map
          drawingManager.setMap(null);
          
          // Reset drawing manager reference
          if (setDrawingManagerRef) {
            setDrawingManagerRef(null);
          }
          
          // Reset cursor
          if (mapRef && mapRef.current) {
            mapRef.current.setOptions({
              draggableCursor: 'default',
              draggingCursor: 'grab'
            });
          }
        };
      } catch (error) {
        console.error("Error initializing drawing manager:", error);
        return () => {}; // Empty cleanup if error occurs
      }
    }
    
    return () => {}; // Empty cleanup when not active
  }, [isActive, mapRef, onPolygonComplete, onDrawingModeChanged, setDrawingManagerRef]);
  
  // This component doesn't render anything visible
  return null;
};

export default MapDrawingManager;