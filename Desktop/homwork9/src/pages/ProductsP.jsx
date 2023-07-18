import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Person3Icon from "@mui/icons-material/Person3";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../schema/category";
// import { request2 } from "../server/request2";
import { NavLink } from "react-router-dom";
import axios from "axios";

const ProductsP = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const albumId = JSON.parse(localStorage.getItem("ID"));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(categorySchema) });

  const getData = useCallback(async () => {
    try {
      let { data } = await axios.get(
        `https://64b5702bf3dbab5a95c751ee.mockapi.io/api/v1/categgory/${albumId}/product`,
        { params: { name: search } }
      );
      // let { data } = await request2("product", { params: { name: search } });

      setCategories(data);
      console.log(data);
    } catch (err) {
      toast.error(err.response.data);
    }
  }, [search, albumId]);

  useEffect(() => {
    getData();
  }, [getData]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = async (data) => {
    try {
      const isValid = await categorySchema.isValid(data);
      if (isValid) {
        if (selected) {
          await axios.put(
            `https://64b5702bf3dbab5a95c751ee.mockapi.io/api/v1/categgory/${albumId}/product/${selected}`,
            data
          );
        } else {
          await axios.post(
            `https://64b5702bf3dbab5a95c751ee.mockapi.io/api/v1/categgory/${albumId}/product`,
            data
          );
        }
        reset();
        getData();
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const edit = async (id) => {
    let { data } = await axios.get(
      `https://64b5702bf3dbab5a95c751ee.mockapi.io/api/v1/categgory/${albumId}/product/${id}`
    );
    reset(data);
    openModal();
    setSelected(id);
  };

  const deleteCategory = async (id) => {
    let check = confirm("Are you sure you want to delete this category?");
    if (check) {
      await axios.delete(
        `https://64b5702bf3dbab5a95c751ee.mockapi.io/api/v1/categgory/${albumId}/product/${id}`
      );
      getData();
    }
  };

  function StudentCategory(id) {
    localStorage.setItem("IDS", JSON.stringify(id));
  }

  return (
    <div className="container">
      <div className="input-group my-3">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="input-group-text" onClick={openModal}>
          Add
        </button>
      </div>

      <div className="container ">
        <div className="row ">
          {categories.map(({ name, image, id }) => (
            <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="our-team">
                <div className="picture">
                  <img className="img-fluid" src={image} />
                </div>
                <div className="team-content">
                  <h3 className="name">
                    {name}
                    {id}
                  </h3>
                  <h4 className="title">Web Developer</h4>
                </div>
                <ul className="social">
                  <li>
                    <button className="buttonsmall" onClick={() => edit(id)}>
                      <DriveFileRenameOutlineIcon
                        sx={{
                          fontSize: "30px",
                          color: "green",
                          gap: "15px",
                        }}
                      />
                    </button>
                  </li>
                  <li>
                    <button
                      className="buttonsmall"
                      onClick={() => deleteCategory(id)}
                    >
                      <DeleteOutlineIcon
                        sx={{ fontSize: "30px", color: "red" }}
                      />
                    </button>
                  </li>
                  <li>
                    <NavLink
                      to={`/profilCatagory/${id}`}
                      style={{ marginRight: "10px" }}
                      onClick={() => StudentCategory(id)}
                      className="buttonsmall"
                      id="button-addon2"
                    >
                      <Person3Icon
                        sx={{ fontSize: "30px", color: "#c300ff" }}
                      />
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            width: "50%",
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <input
              {...register("name")}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          {errors.name && (
            <p role="alert" className="text-danger">
              {errors.name.message}
            </p>
          )}
          <div className="input-group mb-3">
            <input
              {...register("image")}
              type="text"
              className="form-control"
              placeholder="Image"
            />
          </div>
          {errors.image && (
            <p role="alert" className="text-danger">
              {errors.image.message}
            </p>
          )}
          <button className="btn btn-danger me-3" onClick={closeModal}>
            Close
          </button>
          <button type="submit" className="btn btn-success">
            {selected ? "Save" : "Add"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductsP;
