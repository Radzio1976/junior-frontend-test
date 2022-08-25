import React from 'react';

class CategorySection extends React.Component {
    render() {
        const categoryOfProduct = this.props.categoryOfProduct;
        return(
            <section className="category-section">
            <h2>{categoryOfProduct}</h2>
          </section>
        )
    }
};

export default CategorySection;