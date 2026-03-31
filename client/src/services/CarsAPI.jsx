
const BASE_URL = 'http://localhost:5001/cars'

export const getAllCars = async () => {
    const response = await fetch(BASE_URL);

    if(!response.ok) {
        throw new Error("Failed to fetch cars");

    }
    return response.json();
};

export const getCar = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if(!response.ok) {
        throw new Error("Failed to fetch car");
    }
    return response.json();
}

export const createCar = async(carData) => {
    console.log("createCar called with:", carData);
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
    });

    console.log("Server response status:", response.status);
    
    if(!response.ok){
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.error || "Failed to create car");
    }
    return response.json();
};


export const updateCar = async (id, carData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
    });

    if(!response.ok) {
        let message = "Failed to update car";
        try {
            const errorData = await response.json();
            message = errorData?.error || errorData?.err || message;
        } catch {
            try {
                const text = await response.text();
                if (text) message = text;
            } catch {
                // ignore
            }
        }
        throw new Error(message);
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength === '0') return null;

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        const text = await response.text();
        return text ? { message: text } : null;
    }

    // Some servers omit content-length; handle empty body gracefully.
    const text = await response.text();
    return text ? JSON.parse(text) : null;
};

export const deleteCar = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if(!response.ok) {
        throw new Error("Failed to delete car");
    }
    return true;
}