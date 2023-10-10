document.addEventListener("DOMContentLoaded", () => {
    // Make a GET request to /films/1 to fetch movie data
    fetch("http://localhost:3000/films/1")
        .then((response) => response.json())
        .then((data) => {
            // Populate the movie details on the page
            document.getElementById("poster").src = data.poster;
            document.getElementById("title").textContent = data.title;
            // Set other movie details
            const availableTickets = data.capacity - data.tickets_sold;
            document.getElementById("available-tickets").textContent = availableTickets;

            // Add event listener to the "Buy Ticket" button
            const buyTicketButton = document.getElementById("buy-ticket");
            buyTicketButton.addEventListener("click", () => {
                console.log("Buy Ticket button clicked"); // Debug statement
                if (availableTickets > 0) {
                    console.log("Tickets available:", availableTickets); // Debug statement
                    // Reduce available tickets count and update the display
                    availableTickets--;
                    document.getElementById("available-tickets").textContent = availableTickets;
                } else {
                    alert("Tickets are sold out!");
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
        });

    // Make a GET request to /films to fetch the list of movies
    fetch("http://localhost:3000/films")
        .then((response) => response.json())
        .then((movies) => {
            const filmsList = document.getElementById("films");

            // Loop through the movies data and populate the list
            movies.forEach((movie) => {
                const listItem = document.createElement("li");
                listItem.classList.add("film", "item"); // Optional: Add classes for styling

                // Create an image element and set its attributes
                const img = document.createElement("img");
                img.src = movie.poster; // Set the movie poster URL
                img.alt = `${movie.title} Poster`;

                // Create a paragraph element for the movie title
                const titleParagraph = document.createElement("p");
                titleParagraph.textContent = movie.title;

                // Append the image and title to the list item
                listItem.appendChild(img);
                listItem.appendChild(titleParagraph);

                // Append the list item to the films list
                filmsList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching movie list:", error);
        });
});
