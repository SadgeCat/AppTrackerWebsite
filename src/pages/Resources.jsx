import { useState } from "react";

import InternshipCard from "../components/InternshipCard";

const Resources = () => {
    const [internshipList, setInternshipList] = useState([]);
    const [search, setSearch] = useState("");

    const url = 'https://internships-api.p.rapidapi.com/active-jb-7d';
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'eb29460294msh991db04be0a5a90p1b0c1bjsnc7f3d21dc9d1',
            'x-rapidapi-host': 'internships-api.p.rapidapi.com'
        }
    };

    const HandleSearch = e => {
        e.preventDefault();
        console.log(search);
        FetchInternship(search);
    }
    
    const FetchInternship = async (query) => {
        const temp = await fetch(`${url}?title_filter=${query}`, options);
        const data = await temp.json();
        console.log(data);
        setInternshipList(data.slice(0,10));
    }

    return (
        <>
            <h2 className="title">Resources</h2>
            <div className="internship">
                <form
                    className="search-box"
                    onSubmit={HandleSearch}>
                    <input
                        type="search"
                        placeholder="search internship"
                        required
                        value={search}
                        onChange={e => setSearch(e.target.value)}/>
                </form>
                <div className="internship-list">
                    {internshipList.map((internship) => {
                        return (
                            <InternshipCard 
                                internship={internship}
                                key={internship.id}/>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Resources;