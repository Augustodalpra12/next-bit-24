import { postRequest } from "@/service/employeeservice";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddEmployee() {

    const [alert , setAlert] = useState(false);
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");


    async function onSubmitHandler(e) {
        e.preventDefault();

        const employee = {
            firstName,
            lastName,
            email
        }
        await postRequest("api/employees", employee);
        router.push("/");
        setAlert(true);
        setTimeout(()=>setAlert(false), 2000);
        

    }

    return (
    <>
    {alert && (
    <div className="d-flex justify-content-center mt-5">
        <p className="alert alert-success">Employee added successfully!</p>
    </div>
    )}
    <h2 className="mt-2 text-center">Add Employee</h2>
    <div className="container mt-5">
        <form onSubmit={(e)=>onSubmitHandler(e)}>
            <div className="mb-3">
            <label htmlFor="employeeName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" placeholder="name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
            <div className="mb-3">
            <label htmlFor="employeeLastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" placeholder="last name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            </div>
            <div className="mb-3">
            <label htmlFor="employeeEmail" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="email@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>

        </form>
    </div>
        </>
    );
}