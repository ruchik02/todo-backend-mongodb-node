const express = require("express");
const app = express();
const Todo = require("./todo");
const router = express.Router();
app.use(router);
// get
router.get("/gettodos", async (req, res) => {
  const result = await Todo.find();
  console.log(result,"8");
  res.send(result);
});
// post
router.post("/addtodo", async (req, res) => {
  try {
    console.log(req.body,"13");
    const text1 = req.body.text;
    const completed = req.body.completed;
    console.log(completed,"18")
    if (text1.trim() != "") {
      const todo = new Todo({
        text: text1,
        completed: completed,
      });
      const todo1 = await todo.save();
      const todos = await Todo.find();
      console.log(todos,"25",todo1);
      res.send(todos);

    } else {
      console.log(todo,"28");
    }
  } catch (error) {
    console.log(error,"33");
    res.send(error);
  }
});
// delete
router.delete("/removetodo/:id",async(req,res)=>{
  try {
    console.log("hellooo")
    let id= req.params.id;
    console.log(id);
    let todos=await Todo.findByIdAndDelete(req.params.id);
    let alltodos=await Todo.find();
    res.send(alltodos);
  }
   catch (error) {
    res.send(error); 
  }
  });
  // get clear completed
  router.get("/clearcompleted",async(req,res)=>{
   const result=await Todo.remove({'completed':'true'});
   const todos=await Todo.find();
    res.send(todos);
  })
module.exports = router;
