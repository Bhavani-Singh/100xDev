import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Form() {
    const local = useLocation();
    const {state} = local;
    const {user} = useAuth();
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [interest1, setInterest1] = useState("");
    const [interest2, setInterest2] = useState("");
    const [interest3, setInterest3] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [twitter, setTwitter] = useState("");
    const [file, setFile] = useState("");
    const [image, setImage] = useState();

    async function handleUpdate() {
        const formData = new FormData();
        // const interests = [interest1, interest2, interest3];
        formData.append("file", file);
        formData.append("name",name);
        formData.append("designation", designation);
        formData.append("interest[]", interest1);
        formData.append("interest[]", interest2);
        formData.append("interest[]", interest3);
        formData.append("twitter", twitter);
        formData.append("linkedin", linkedIn);

        console.log(formData.get("interest[]"));
        const result = await axios({
            method: "post",
            url: `http://localhost:3000/admin/update/${state.id}`,
            data: formData,
            headers: {
                "authorization": user.token,
                "Content-Type": "multipart/form-data"
            }

        });
    }

    useEffect(() => {
        async function populateForm() {
            const result = await axios({
                                method: "get",
                                url: `http://localhost:3000/admin/populate/${state.id}`,
                                headers: {
                                    "authorization": user.token
                                }
                            });
            setName(result.data.result.name);
            setDesignation(result.data.result.designation);
            setInterest1(result.data.result.interest[0]);
            setInterest2(result.data.result.interest[1]);
            setInterest3(result.data.result.interest[2]);
            setLinkedIn(result.data.result.linkedin);
            setTwitter(result.data.result.twitter);
            setImage(result.data.result.image);
        }   
        populateForm();
    }, []);

    return (
        <div>
            <center>
                <form>
                <img src={`http://localhost:3000/profilepics/${image}`} width="200px" height="200px" style={{ borderRadius: "50%" }} />
                    User Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
                    Designation: <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} /> <br />
                    Interest:
                    <input type="text" value={interest1} onChange={(e) => setInterest1(e.target.value)} /> 
                    <input type="text" value={interest2} onChange={(e) => setInterest2(e.target.value)} /> 
                    <input type="text" value={interest3} onChange={(e) => setInterest3(e.target.value)} /> <br />
                    LinkedIn: <input type="text" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} /> <br />
                    Twitter: <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} /> <br />
                    Image: <input type="file" accept="image/*" onChange={async (e) => {
                        await setFile(e.target.files[0]);
                        console.log(e.target.files[0]);

                    }}/>
                </form>
                <button onClick={handleUpdate}>Update</button>
            </center>
        </div>
    )
}

export default Form;