import { open, close, readFileSync, writeFile, statSync } from "fs";

const usersFilePath = "data/users.json";

function addDataToFile(data) {
  const stringifiedJSON = JSON.stringify(data);
  writeFile(usersFilePath, stringifiedJSON, (err) => {
    if (err) console.error("Writing File Failed!!");
  });
}

function readJSONDataFromFile() {
  let data = readFileSync(usersFilePath, "utf-8");
  try {
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("Error in parsing data: ", err.message);
  }
  return null;
}

export const addUser = (name, age, uuid) => {
  // using a+, to read and append the file, so that stored data isn't lost
  open(usersFilePath, "a+", (err, fd) => {
    if (err) {
      console.error(
        "Error in opening file: %s | Code: %s",
        err.message,
        err.code
      );
      return;
    }

    let fileStat = statSync(usersFilePath);

    if (fileStat.size > 0) {
      let jsonData = readJSONDataFromFile();
      jsonData["users"].push({
        uuid: uuid,
        name: name,
        age: age,
      });
      // overwriting the updated data to the json file.
      addDataToFile(jsonData);
    } else {
      const users = {
        users: [
          {
            uuid: uuid,
            name: name,
            age: age,
          },
        ],
      };
      addDataToFile(users);
    }

    close(fd, (err) => {
      if (err) console.error("Error in closing file: ", err.message);
    });
  });
  return {
    status: "User added successfully!!",
    uuid: uuid,
  };
};

export const fetchUserById = (uuid) => {
  let fileStat = statSync(usersFilePath);
  if (fileStat.size > 0) {
    let jsonData = readJSONDataFromFile();
    let userData;
    jsonData.users.forEach((user) => {
      if (user.uuid == uuid) {
        userData = user;
        return;
      }
    });
    if (userData) {
      return {
        status: "User found!",
        data: {
          name: userData.name,
          age: userData.age,
        },
      };
    } else {
      return {
        status: "error",
        message: "No User found by the provided uuid!!",
      };
    }
  } else {
    return {
      status: "error",
      message: "No users found!!",
    };
  }
};

export const updateUserById = (uuid, name, age) => {
  let fileStat = statSync(usersFilePath);

  if (fileStat.size > 0) {
    let jsonData = readJSONDataFromFile();
    let userFound = false;
    jsonData.users.forEach((user) => {
      if (user.uuid == uuid) {
        if (name != undefined && String(name).length > 0) user.name = name;
        if (age != undefined) user.age = age;
        userFound = true;
        return;
      }
    });
    // overwriting the updated data to the json file.
    if (userFound) {
      addDataToFile(jsonData);
      return {
        status: "Update Successful!",
        message: "Users details were updated!",
      };
    } else {
      return {
        status: "Update Failed!",
        message: "User was not found!",
      };
    }
  } else {
    return {
      status: "Update Failed!",
      message: "No records found!",
    };
  }
};

export const deleteUserById = (uuid) => {
  let fileStat = statSync(usersFilePath);
  if (fileStat.size > 0) {
    let userFound = false;
    let jsonData = readJSONDataFromFile();
    jsonData.users.forEach((user) => {
      if (user.uuid == uuid) {
        jsonData["users"].pop();
        userFound = true;
      }
    });

    if (userFound) {
      addDataToFile(jsonData);
      return {
        status: "Delete Successful!",
        message: "User record was deleted!",
      };
    } else {
      return {
        status: "Update Failed!",
        message: "No user found by provided uuid!",
      };
    }
  } else {
    return {
      status: "Delete Failed!",
      message: "No records found!",
    };
  }
};

export const fetchAllUsers = () => {
  let fileStat = statSync(usersFilePath);
  if (fileStat.size > 0) {
    let jsonData = readJSONDataFromFile();
    return jsonData.users;
  } else {
    return {
      status: "Query Failed!",
      message: "No records found!",
    };
  }
};
