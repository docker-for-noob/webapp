import React from 'react';

const defaultImage = "https://cdn-icons-png.flaticon.com/512/3037/3037071.png";

interface ContainerImageProps {
    imageName: string;
}

export default function ContainerImage(props: ContainerImageProps) {

    const generateImageUrl =(imageName: string) => {
        return process.env.REACT_APP_IMAGE_URL + "/library-" + imageName + "-logo.png";
      };

    return (
        <img
        src={generateImageUrl(props.imageName)}
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
        alt={props.imageName}
        style={{ width: 64, height: 64, marginRight: "1rem" }}
      />
    );
}