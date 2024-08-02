import React, { useState, useEffect, useCallback } from "react";

import Loader from "../../../components/loader";
import { Customer } from "../customerTypes";

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails = (props: CustomerDetailsProps) => {
  const { customer } = props;
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedPhotos, setLoadedPhotos] = useState<boolean[]>([]);


  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const randomPage = Math.floor(Math.random() * 100) + 1; // Random page number between 1 and 100
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${randomPage}&limit=9`
      );
      const data = await response.json();
      setPhotos(data.map((photo: any) => photo.download_url));
      setLoadedPhotos(new Array(data.length).fill(false));
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  },[])

  useEffect(() => {

    fetchPhotos();
    const interval = setInterval(fetchPhotos, 10000);

    return () => clearInterval(interval);
  }, [customer]);

  const handleImageLoad = (index: number) => {
    setLoadedPhotos(prev => {
      const newLoadedPhotos = [...prev];
      newLoadedPhotos[index] = true;
      return newLoadedPhotos;
    });
  };

  return (
    <div className="customer-details">
      <div className="customer-header">
        <h2>{customer.name}</h2>
        <p>{customer.title}</p>
        <p>{customer.address}</p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-grid-item">
            <div className={`shimmer ${loadedPhotos[index] ? 'loaded' : ''}`}>
              <img
                src={photo}
                alt={`Customer ${customer.id} photo ${index + 1}`}
                onLoad={() => handleImageLoad(index)}
                className={loadedPhotos[index] ? 'loaded' : 'loading'}
              />
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default CustomerDetails;
