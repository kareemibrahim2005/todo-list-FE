const update = document.getElementById("update");
const container = document.getElementById("container");
const wrapper = document.getElementById("wrapper");
const form = document.getElementById("form");
const minus = document.getElementById("icon4");
const plus = document.getElementById("icon3");
const button = document.querySelectorAll(".button");
const para = document.getElementById("p");

const d = new Date();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let title = document.querySelector("#title").value;
let description = document.querySelector("#discription").value;
const date = `${d.getDate()}/${months[d.getMonth()]}/${d.getFullYear()}`;

const todoList = {
  title: title,
  discription: description,
  date: date,
  completed: false,
};

function deleteAll() {
  const setBtn = document.querySelector(".clear");
  setBtn.classList.toggle("toggle");
}

for (let i = 0; i < button.length; i++) {
  if (button) {
    button[i].addEventListener("click", function (btn) {
      btn.target.classList.toggle("active");
      const el = button[i].nextElementSibling;
      console.log("worked");

      if (el.style.display === "block") {
        el.style.display = "none";
      } else {
        el.style.display = "block";
      }
    });
  }
}

plus.addEventListener("click", function () {
  form.style.animation = "slideBottom 1s ease forwards";
});

minus.addEventListener("click", function async() {
  form.style.animation = "slideTop 1s ease forwards";
});

form.addEventListener("animationend", () => {
  form.style.opacity = "0";
});

/* const data =
    {
        title: inputtitle,
        discription: inputdiscription,
        date: inputdate
    }
 */

/* class SendData {
  constructor(title, discription, date) {
    this.title = title;
    this.discription = discription;
    this.date = date;
  }

  todoData() {
    return {
      title: this.title,
      discription: this.discription,
      date: this.date,
      completed: false,
    };
  }
} */

// const getData = new SendData(title, discription, date);

async function postData(e) {
  e.preventDefault();
  console.log(todoList);
  await fetch("https://todo-lists-2ckh.onrender.com/api/books/", {
    method: "POST",
    body: JSON.stringify(todoList),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());

  location.reload();
}

form.addEventListener("submit", postData);

fetch("https://todo-lists-2ckh.onrender.com/api/book/uncompleted")
  .then((res) => res.json())
  .then((data) => {
    let data1;
    data.map((values) => {
      data1 += `<details>
      <summary class="button" id="button">
        <span>${values.title}</span>
        <div>
            <box-icon class="update-btn" color="blue" onclick="updated('${values._id}')" name='check-square'></box-icon>
        </div>
      </summary>
      <div class="details">
           <p id="p">${values.discription}</p>
      </div>
  </details>`;
      document.querySelector(".left-list").innerHTML = data1;
    });
  });

function test(id) {
  console.log(id);
}

fetch("https://todo-lists-2ckh.onrender.com/api/book/completed")
  .then((res) => res.json())
  .then((data) => {
    let data1;
    data.map((values) => {
      data1 += `
      <details>
          <summary class="button" id="button">
            <span>${values.title}</span>
            <div>
                <box-icon class="return-btn" color="blue" onclick="returned('${values._id}')" type='solid' name='check-square'></box-icon>
                <box-icon color="red" class="trash-btn" type='solid' name='trash' onclick="deleted('${values._id}')"></box-icon>
            </div>
          </summary>
          <div class="details">
               <p id="p">${values.discription}</p>
          </div>
      </details>

      
     `;
      document.querySelector(".right-list").innerHTML = data1;
    });
  });

const updated = async (id) => {
  try {
    await fetch(
      `https://todo-lists-2ckh.onrender.com/api/books/completed/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(todoList),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const returned = async (id) => {
  try {
    await fetch(
      `https://todo-lists-2ckh.onrender.com/api/books/uncompleted/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(todoList),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const deleted = async (id) => {
  try {
    await fetch(`https://todo-lists-2ckh.onrender.com/api/books/${id}`, {
      method: "delete",
      body: JSON.stringify(todoList),
      headers: {
        "Content-type": "application/json",
      },
    });
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const deleteAllTask = async () => {
  try {
    await fetch(
      `https://todo-lists-2ckh.onrender.com/api/books/delete/completed`,
      {
        method: "delete",
        body: JSON.stringify(todoList),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

//  <i class="fa-solid fa-square-check" onclick="returned('${values._id}')"></i>
//  <i class="fi fi-rs-trash" onclick="deleted('${values._id}')></i>
