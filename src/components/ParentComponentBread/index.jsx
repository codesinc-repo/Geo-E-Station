import React from "react";
import { Breadcrumb } from "react-bootstrap";

// LocationBreadcrumbs Component
const LocationBreadcrumbs = ({ location }) => {
  console.log("Breadcrumbs rendering with:", location); // Log to confirm what's being rendered

  return (
    <Breadcrumb>
      <Breadcrumb.Item active>{location?.country || "Country"}</Breadcrumb.Item>
      <Breadcrumb.Item active>{location?.state || "State"}</Breadcrumb.Item>
      <Breadcrumb.Item active>{location?.city || "City"}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

// Parent Component
const ParentComponentBread = ({ state }) => {
  if (!state) {
    console.error("State is undefined!"); // Log an error if state is missing
    // return <p>Location data is unavailable.</p>;
  }

  return (
    <div className="px-3">
      <LocationBreadcrumbs
        key={`${state.country || "unknown"}-${state.state || "unknown"}-${state.city || "unknown"}`}
        location={state}
      />
    </div>
  );
};

export default ParentComponentBread;
