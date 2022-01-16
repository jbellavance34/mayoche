import React from 'react'

const Cat = () => {
    return (
        <div style={styles.container}>
            <figure>
                <img src='https://mayoche.s3.amazonaws.com/cat.jpg' alt="cute-cat" style={styles.img} />
                <figcaption>Cat of the day</figcaption>
            </figure>
            <figure>
                <img src='https://mayoche.s3.amazonaws.com/dog.jpg' alt="cute-dog" style={styles.img} />
                <figcaption>Dog of the day</figcaption>
            </figure>
            <figure>
                <img src='https://mayoche.s3.amazonaws.com/pet.jpg' alt="cute-pet" style={styles.img} />
                <figcaption>Pet of the day</figcaption>
            </figure>
        </div>
    )
}
const styles = {
    container: { width: 1000, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 0 },
    img: { width: '400px', height: '400px', margin: '0 auto' }
}

export default Cat;