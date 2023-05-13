import React, {useEffect, useState} from 'react';
import {Typography, Card} from "@mui/material";
import {Box, FormControlLabel,Checkbox} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from 'react-redux';
import Button from "@mui/material/Button";




const Filter = ({setFilteredResult, reduxData, filterKey}) => {

    const [filteredData, setFilteredData] = useState(filterKey? {active: true} : null)
    // const [filteredData, setFilteredData] = useState(null)
    const [filterFields, setFilterFields] = useState(null)
    // const usersListData = useSelector(state => state.usersList.users)

     // call filter on change
     useEffect(()=>{
        // if(filteredData !== null )
        if(filteredData !== null && reduxData !== null)
        {
            const keys = Object.keys(filteredData);
            const values = Object.values(filteredData);
            const result = reduxData.filter((filterItem) => {
                return keys.every((key) => {
                return values.some(() => filterItem[key]?.toString().toLowerCase().includes(filteredData[key]))
                // return values.some(() => filterItem[key]?.toString().toLowerCase().includes(filteredData[key].toLowerCase()))
            })
          })

          setFilteredResult(result)
        }
        
    },[filteredData])

    // // call filter on change
    // useEffect(()=>{
    //     if(filteredData !== null)
    //     {
    //         const keys = Object.keys(filteredData);
    //         const values = Object.values(filteredData);
    //         const result = usersListData.filter((user) => {
    //             return keys.every((key) => {
    //             return values.some(() => user[key].toLowerCase().includes(filteredData[key].toLowerCase()))
    //         })
    //       })

    //       setFilteredResult(result)
    //     }
        
    // },[filteredData])



// // generate fiter feilds
//     useEffect(()=>{
//         if(usersListData !== null)
//         {
//             usersListData.filter(element => {
//                 setFilterFields(Object.keys(element))  
//                 })
//         }
//     },[usersListData])

// generate fiter feilds
    useEffect(()=>{
        if(reduxData !== null)
        { console.log("filter = ", reduxData)
            reduxData.filter(element => {
                setFilterFields(Object.keys(element))  
                })
        }
    },[reduxData])



    const filterDataChangeFun =(e) => {
        let cleanFilteredData = null;
       if(e.target.value.length !== 0)
       {
            // used with filtering with checkbox in account page
            if(e.target.name === "active")
            {
                setFilteredData((prevState) =>({
                    ...prevState,
                    [e.target.name]:  !filteredData.active
                }))
            }

            if(e.target.name !== "active")
            {
                setFilteredData((prevState) =>({
                    ...prevState,
                    [e.target.name]: e.target.value
                }))
            }
       }
       else
       {
            cleanFilteredData = Object.fromEntries(Object.entries(filteredData).filter(([key]) => e.target.name !== key));
            setFilteredData(cleanFilteredData)
       }            
    }

    return(
            <Card 
            sx={{
                backgroundColor: "background.paper",
                marginBottom: "20px",
                // mt: "6px",
                // position: "absolute",
                // px: "4px",
                width: "100%",
                // zIndex: 2,
            }}
        >

             {/* generate fiter feilds */}
            {filterFields && (
                filterFields.map((filterField)=>(
                    
                    filterField !== "id" 
                    && filterField !== "user" 
                    && filterField !== "active" 
                    && filterField !== "url" 
                    && filterField !== "app_version" 
                    && filterField !== "phone_number_id" 
                    && filterField !== "access_token" 
                    && filterField !== "company" 
                    && filterField !== "first_name" 
                    && filterField !== "is_active" 
                    && filterField !== "is_admin" 
                    && filterField !== "is_staff" 
                    && filterField !== "is_superuser" 
                    && filterField !== "last_name" 
                    && filterField !== "password" 
                    && filterField !== "phone_number" 
                    ?(
                    <Box
                    sx={{
                        m: 1,
                        maxWidth: "100%",
                        width: 200,
                        display: "inline-block"
                        
                    }}
                    key={filterField}
                    >
                    <TextField
                        fullWidth
                        placeholder={filterField.replaceAll("_"," ").replace("get","")}
                        // placeholder={filterField.replace("_", " ")}
                        name={filterField}
                        onChange={filterDataChangeFun}
                        type="search"
                    />
                </Box>
                ): filterField === "active" ? (
                    <FormControlLabel 
                    control={<Checkbox checked={filteredData.active} />} 
                    // control={<Checkbox checked={filteredData?.active} defaultChecked/>} 
                    label={filterField.charAt(0).toUpperCase() + filterField.slice(1)} 
                    key={filterField}
                    name={filterField}
                    onChange={filterDataChangeFun}
                    />
                ) : null
                )))}

        
            {/* <Box
                sx={{
                    m: 1,
                    maxWidth: "100%",
                    width: 200,
                    display: "inline-block"
                }}
                >
                <TextField
                    fullWidth
                    placeholder="Email"
                    onChange={filterDataChangeFun}
                    name='email'
                    type="search"
                    // InputProps={{
                    //     endAdornment: (
                    //         <IconButton  onClick={(e)=>filterClearField(e)}><ClearIcon/></IconButton>
                    //          ),
                    //       }}
                />
            </Box>

            <Box
                sx={{
                    m: 1,
                    maxWidth: "100%",
                    width: 200,
                    display: "inline-block"
                }}
                >
                <TextField
                    fullWidth
                    placeholder="Full Name"
                    name='full_name'
                    onChange={filterDataChangeFun}
                    type="search"
                />
            </Box>

            <Box
                sx={{
                    m: 1,
                    maxWidth: "100%",
                    width: 200,
                    display: "inline-block"
                }}
                >
                <TextField
                    fullWidth
                    placeholder="Company"
                    name='get_company'
                    onChange={filterDataChangeFun}
                    type="search"
                />
            </Box>

            <Box
                sx={{
                    m: 1,
                    maxWidth: "100%",
                    width: 200,
                    display: "inline-block"
                }}
                >
                <TextField
                    fullWidth
                    placeholder="Role"
                    name='get_role'
                    onChange={filterDataChangeFun}
                    type="search"
                />
            </Box> */}
        </Card>
    )
}

export default Filter;