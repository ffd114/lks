import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class TodosController {
  public async done({ view, params }: HttpContextContract) {
    const id = params.id

    const todo = await Todo.find(id)

    if (todo) {
      todo.isDone = true
      await todo.save()
    }

    return view.render('components/todo', { todo })
  }
  public async index({ view }: HttpContextContract) {
    const todos = await Todo.all()
    return view.render('todos/index', { todos })
  }

  public async store({ view, request }: HttpContextContract) {
    const todoSchema = schema.create({
      todo: schema.string(),
    })

    const todo = await request.validate({ schema: todoSchema })
    const createdTodo = await Todo.create({
      todo: todo.todo.trim(),
    })

    return view.render('todos/store', { todo: createdTodo })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const id = params.id

    const todo = await Todo.find(id)
    await todo?.delete()

    return response.ok('')
  }
}
