import React from "react";
import { useCategories } from "../../hooks/useCategories";
import { Link } from "react-router-dom";
import './Categories.css'

const Categories: React.FC = () => {
  const { data, isLoading, error } = useCategories();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>Data is undefined</div>;

  return (
    <div className="categories row">
      <h1>Categories</h1> 
      {data.map((category: { id: number; name: string }) => (
        <div key={category.id} className="col-md-4 mb-4">
          <div className="card-category">
            <div className="card-body">
              <h5 className="card-title">{category.name}</h5> <br/>
              <Link to={`/events/${category.name}`} className="btn">
                Show Events
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
