import { getRequest } from "@/service/employeeservice";
import { useEffect, useState } from "react";
import Card from "../components/card";

export default function Home() {

  const[refresh, setRefresh] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, [refresh])

  async function getAllEmployees() {
    const allEmployees = await getRequest("api/employees");
    setEmployeeList(allEmployees);


  }


  function onRefreshButtonClickHandler(e) {
    setRefresh(!refresh);
  }



  return (
    <>
      <div className="container">
        <div className="row">
          {
            employeeList.map((employee, id) => {
              return (
                <div className="col-md-4 mb-4 mt-4" key={id}>
                  <Card 
                    employeeId={employee.id}
                    name={employee.firstName}
                    lastName={employee.lastName}
                    email={employee.email}
                    onRefreshButtonClickHandler={onRefreshButtonClickHandler}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
