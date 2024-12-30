export default defineEventHandler(async (event) => {
  try {
    const todo = await $fetch("https://dummyjson.com/todos", {
      method: "GET",
    });

    return todo;
  } catch (error) {
    return error;
  }
});
