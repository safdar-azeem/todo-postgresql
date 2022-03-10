import { Request, Response } from 'express'
import { TodoFactory } from '../models/todo.model'

const Todo = TodoFactory()

const todoController = {
   getTodos: async (req: Request, res: Response) => {
      try {
         const todos = await Todo.findAll()
         res.json(todos)
      } catch (error) {
         console.error('Error getting todos:', error)
         res.status(500).json({ error: 'Internal server error' })
      }
   },
   getTodo: async (req: Request, res: Response) => {
      try {
         const { id } = req.params
         const todo = await Todo.findByPk(id)
         if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
         }
         res.json(todo)
      } catch (error) {
         console.error('Error getting todo:', error)
         res.status(500).json({ error: 'Internal server error' })
      }
   },
   addTodo: async (req: Request, res: Response) => {
      try {
         const { description } = req.body
         if (!description) {
            return res.status(400).json({ error: 'Description is required' })
         }
         await Todo.create({ description })
         res.status(201).json({ message: 'Todo added successfully' })
      } catch (error) {
         console.error('Error adding todo:', error)
         res.status(500).json({ error: 'Internal server error' })
      }
   },
   updateTodo: async (req: Request, res: Response) => {
      try {
         const { id } = req.params
         const { description } = req.body
         const todo = await Todo.findByPk(id)
         if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
         }
         await todo.update({ description })
         res.json({ message: 'Todo updated successfully' })
      } catch (error) {
         console.error('Error updating todo:', error)
         res.status(500).json({ error: 'Internal server error' })
      }
   },
   deleteTodo: async (req: Request, res: Response) => {
      try {
         const { id } = req.params
         const todo = await Todo.findByPk(id)
         if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
         }
         await todo.destroy()
         res.json({ message: 'Todo deleted successfully' })
      } catch (error) {
         console.error('Error deleting todo:', error)
         res.status(500).json({ error: 'Internal server error' })
      }
   },
}

export default todoController
