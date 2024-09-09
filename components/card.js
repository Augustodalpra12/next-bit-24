import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteRequest } from "@/service/employeeservice";
import { useRouter } from "next/router";

export default function Card(props) {
  const router = useRouter();
  const { employeeId, name, lastName, email, onRefreshButtonClickHandler } = props;

  useEffect(() => {
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);
  }, []);

  async function onDeleteButtonClickHandler(e) {
    try {
      await deleteRequest(`api/employees/${employeeId}`);
      onRefreshButtonClickHandler();
    } catch (error) {
      console.error("Failed to delete the employee:", error);
    }
  }

  function onUpdateButtonClickHandler(e) {
    router.push("/update?employeeId=" + employeeId);
  }

  return (
    <>
      <div className="card shadow-sm" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{employeeId}</h5>
          <p className="card-text">{name}</p>
          <p className="card-text">{lastName}</p>
          <p className="card-text">{email}</p>
          <hr />
          <div className="d-flex">
            <button className="btn btn-primary" onClick={onUpdateButtonClickHandler}>
              Update
            </button>
            <button className="btn btn-danger ms-auto" data-bs-toggle="modal" data-bs-target={`#modalId-${employeeId}`}>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id={`modalId-${employeeId}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{name}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">Do you want to delete this employee?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">No</button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={onDeleteButtonClickHandler}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
