import React from "react";
import { useSelector } from "react-redux";

function Report() {
  const data = useSelector((state) => state.reportData);
  console.log("Report Data:", data);

  return <div>GeneratedReport</div>;
}

export default Report;
