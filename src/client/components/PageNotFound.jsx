import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFoundPage = () => (
    <div>
        Whops this page doesn't exist - Return to valid page
       <p>
       <Link to="/">Go Home</Link>
       </p> 
    </div>     
);

export default PageNotFoundPage;