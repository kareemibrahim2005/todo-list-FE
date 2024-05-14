fetch("http://localhost:3000/api/books")
  .then((res) => res.json())
  .then((data) => {
    let data1;
    data.map((values) => {
      data1 += `
      <div id="ul">
             <p>${values.firstname}</p>
             <p>${values.lastname}</p>
            <p>${values.email}</p>
     </div>`;
      document.getElementById("container").innerHTML = data1;
      console.log(values);
    });
  });
