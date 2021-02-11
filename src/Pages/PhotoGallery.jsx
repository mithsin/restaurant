import React from 'react';
import { photoGallery } from 'StaticDatas';

const PhotoGallery = () => {
    return(
        <div className="PhotoGolleryOutWrapper">
            <ul className="PhotoGallery-wrapper">
                {photoGallery.map((image, index)=> 
                    <li key={`image-${index}-gallery`}>
                        <img src={image} alt={`image-${index}-gallery`}/>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default PhotoGallery;