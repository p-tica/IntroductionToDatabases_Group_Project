// Citation for starter code
// Date: 06/09/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

function Home() {
    return (
        <>
            <h1>Recording Studio Management System</h1>
            <div className="homepageDescription">
                <p id="homepage">A recording studio in LA works with 500 artists and their managers. The studio has 6 rooms 
                    and records over 3,000 hours per year or about 1,000 recording sessions. Each recording session is billed 
                    separately so about 1,000 invoices are recorded. Each session length is scheduled to be equal to a multiple 
                    of 15 minutes, and the duration of each session is rounded up to the nearest 15-minute interval when being 
                    recorded. As their business has grown over the years, so has the number of files that contain information 
                    about the recording sessions, artists, their managers, invoices, and rooms. A database driven website will 
                    keep record of Recording Sessions and Rooms for Artists and Managers as well as maintain Invoices. This 
                    system will provide an efficient way for the studio to continue to conduct their business.</p>
            </div>
        </>
    )
} export default Home;