import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function AddCategory({ Token, adminlogin }) {
    const nav = useNavigate()
    const [category, setCategory] = useState("")

    const addCate = async () => {
        try {
            let res = await axios.post("https://localhost:7115/api/Category/ADD CATEGORY", {
                catagoryName: category
            }, {
                headers: { Authorization: `Bearer ${Token}` }
            })
            toast.success("New Category Added")
            nav('/Products')
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            {
                adminlogin && Token ?
                    <div>
                        <div className='register login container-fluid' style={{ marginTop: "50px" }}>
                            <h1 style={{ color: "silver" }}>ADD CATEGORY</h1>
                            <label style={{ color: "sienna" }} htmlFor="addcateory">ADD NEW CATEGORY :</label><br />
                            <input type="text" onChange={(e) => setCategory(e.target.value)} />
                            <br />
                            <Button className='m-2' variant='secondary' onClick={addCate}>ADD</Button>
                        </div>
                    </div> : <h1 style={{ color: "red" }}>ACCESS DENIED</h1>
            }
        </div>
    )
}

export default AddCategory