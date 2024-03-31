import { ChangeEvent, useState } from "react";
import styles from "./newClub.module.css";
import { IPosts } from "../../../interfaces/posts";
import { createClub } from "../../../services/fetchData";
import { FormData } from "../../../interfaces/clubs";
import { IUser } from "../../../interfaces/users";
import { toast } from "react-toastify";

interface Params {
  name: string;
  description: string;
  imageUrl: any;
  author: string;
  type: string;
  domain: Array<string>;
}

export const onPublishClick = async (newClubProps: Params) => {
  const { name, description, imageUrl, author, type, domain } = newClubProps;

  // Checking required fields
  if (!name || !description || !domain || !type) {
    toast.error("Please fill in all required fields!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return;
  }

  try {
    console.log(newClubProps);
    const clubCreated = await createClub(newClubProps);
    if(clubCreated){
      //updatePointsNumber(newClubProps.author, userData.).then((res) => {
        //   dispatch(setPointsNumber(points + 10));
         // Dispatch action to update likes number
    return true;
    }
  } catch (error) {
    return false;
  }
};

const NewClub = () => {
  let currentUser = localStorage.getItem("username");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    imageUrl: "",
    type: "",
    domain: [],
    author: currentUser || "",
  });
  
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = e.target.files?.[0];
    if (fileInput) {
      // Set the file directly in formData
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: fileInput, // Store the File object directly
      }));
    }
  };
//UPLOAD IMAGE
// const [file, setFile] = useState<string | undefined>();
// function handleChange(event: { target: { files: (Blob | MediaSource)[]; }; }) {
//     console.log(event.target.files);
//     setFile(URL.createObjectURL(event.target.files[0]));
// }
  // const handleInputChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}> New Club</div>
          <div className={styles.imageContainer}>
            <div className={styles.titlesContainer}>
              <div className={styles.innerTitle}> Club Image</div>
              <div className={styles.secondary}> (optional)</div>
            </div>
            <div className={styles.uploadContainer}>
              <input
                className={styles.upload}
                type="file"
                placeholder="Upload Post"
                name="imageUrl"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.nameContainer}>
            <div className={styles.innerTitle}> Club name</div>
            <input
              className={styles.titleContainer}
              name="name"
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.nameContainer}>
            <div className={styles.innerTitle}> Club description</div>
            <input
              className={styles.description}
              name="description"
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.nameContainer}>
            <div className={styles.innerTitle}> Club type</div>
            <input
              className={styles.titleContainer}
              name="type"
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.nameContainer}>
            <div className={styles.innerTitle}> Domain</div>
            <input
              className={styles.titleContainer}
              name="domain"
              onChange={handleInputChange}
            />
          </div>

          <button
            className={styles.publishButton}
            onClick={() => onPublishClick(formData)}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewClub;
