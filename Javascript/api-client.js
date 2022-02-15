const baseUrl = 'http://localhost:3000/';

const getToDoListItems = async () => {
    let processedResponse;
    try {
    const response = await fetch(baseUrl, { method: 'GET', headers: { "content-type": "application/json"}});
    processedResponse = await response.json();
    } catch (error) {    
        console.log(error);
    };
    return processedResponse;
};

const postTask = async (value, refresh) => {
    const data = {description: value, done: false};
    fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
      },
    });
    refresh();
};

const deleteTask = async (id, refresh) => {
    const url = `${baseUrl}${id}`;
    await fetch(url, {
        method: "DELETE"
    });
    refresh();
};

const updateTask = async (value, id, refresh) => {
    const data = {description: value};
    const url = `${baseUrl}${id}`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
      },
    });
    refresh();
};

const putDone = async (id, done, refresh) => {
    const data = {done: done };
    const url = `${baseUrl}${id}`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
      },
    });
    refresh();
};