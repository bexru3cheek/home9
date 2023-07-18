import { useCallback, useEffect, useState } from "react";
import "./ProfilCatagory.css";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

const ProfilCatagory = () => {
  const albumId = JSON.parse(localStorage.getItem("ID"));
  // const smallID = JSON.parse(localStorage.getItem("IDS"));
  const [data, setData] = useState({}); // Yangi state o'zgaruvchisi yaratamiz

  const getData = useCallback(async () => {
    try {
      let { data } = await axios.get(
        `https://64b5702bf3dbab5a95c751ee.mockapi.io/api/v1/categgory/${albumId}/`
      );
      console.log(data);
      setData(data);
    } catch (err) {
      toast.error(err.response.data);
    }
  }, [albumId]);


  // const getSmallData = useCallback(async () => {
  //   try {
  //     let { data } = await axios.get(
  //       `https://64b5702bf3dbab5a95c751ee.mockapi.io/api/v1/categgory/${albumId}/product/${smallID}`
  //     );
  //     setData(data);
  //     console.log(data);
  //   } catch (err) {
  //     toast.error(err.response.data);
  //   }
  // }, [albumId, smallID]);

  useEffect(() => {
    getData();
  }, [getData]);


  // useEffect(() => {
  //   if (data && smallID) {
  //     getSmallData();
  //   } else {
  //     getData();
  //   }
  // }, [data, smallID, getData, getSmallData]);
  
  return (
    <>
      <section className="section about-section gray-bg" id="about">
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
              <div className="about-text go-to">
                <h3 className="dark-color">{data.name}</h3>
                <h6 className="theme-color lead">
                  A Lead UX &amp; UI designer based in Canada
                </h6>
                <p>
                  I{" "}
                  <mark>
                    {data.description} {data.id}{" "}
                  </mark>{" "}
                  services for customers of all sizes, specializing in creating
                  stylish, modern websites, web services and online stores. My
                  passion is to design digital user experiences through the bold
                  interface and meaningful interactions.
                </p>
                <div className="row about-list">
                  <div className="col-md-6">
                    <div className="media d-flex gap gap-2">
                      <label>Birthday</label>
                      <p>{data.createdAt}</p>
                    </div>
                    <div className="media media d-flex gap gap-2">
                      <label>Age</label>
                      <p>{data.age}Yr</p>
                    </div>
                    <div className="media media d-flex gap gap-2">
                      <label>Residence</label>
                      <p>Canada</p>
                    </div>
                    <div className="media media d-flex gap gap-2">
                      <label>Address</label>
                      <p>California, USA</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="media  d-flex gap gap-2">
                      <label>E-mail</label>
                      <p>{data.email}@domain.com</p>
                    </div>
                    <div className="media  d-flex gap gap-2">
                      <label>Phone</label>
                      <p>{data.phone}820-885-3321</p>
                    </div>
                    <div className="media d-flex gap gap-2">
                      <label>Skype</label>
                      <p>skype.0404</p>
                    </div>
                    <div className="media  d-flex gap gap-2">
                      <label>Freelance</label>
                      <p>Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-avatar">
                <img src={data.image} />
              </div>
            </div>
          </div>
          <div className="counter">
            <div className="row">
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="500" data-speed="500">
                    500
                  </h6>
                  <p className="m-0px font-w-600">Happy Clients</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="150" data-speed="150">
                    150
                  </h6>
                  <p className="m-0px font-w-600">Project Completed</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="850" data-speed="850">
                    850
                  </h6>
                  <p className="m-0px font-w-600">Photo Capture</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <NavLink
                    to={`/categories`} // ID ni /products/ yo'lida kiritamiz
                    style={{ marginTop: "10px", width: "100px" }}
                    className="btn btn-danger"
                    id="button-addon2"
                  >
                    <PeopleIcon
                      sx={{ fontSize: "30px", color: "rgb(255, 187, 0)" }}
                    />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilCatagory;
