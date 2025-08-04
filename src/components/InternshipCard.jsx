const InternshipCard = ({internship}) => {
    return (
        <article className="internship-card">
            <a href={internship.url} target="_blank" rel="noreferrer">
                <div className="internship-logo">
                    <img src={internship.organization_logo} alt={`${internship.organization} logo`} />
                </div>
                <div className="internship-content">
                    <h3>{internship.title}</h3>
                    <p className="org">{internship.organization}</p>
                    <p className="location">{internship.locations_derived?.join(", ")}</p>
                    <p className="type">{internship.employment_type?.join(", ")}</p>
                    <p className="date">Posted on: {new Date(internship.date_posted).toLocaleDateString()}</p>
                </div>
            </a>
        </article>
    )
}

export default InternshipCard