import React, { useContext } from "react";
import { StoreContext } from "../../store";

import "./style.css";

export default function() {
  const { dispatcher, state } = useContext(StoreContext);
  return (
    <nav className="e-nav">
      <button
        className="e-trigger"
        onClick={e => {
          dispatcher({ type: "SWITCH_VERSION" });
        }}
      >
        trigger new and old
      </button>
      current version: { state.isNewVersion ? 'new' : 'old' }
    </nav>
  );
}
