const {Genre, Movie} = require('../models')

class GenreController {
    static async getAll(req,res,next){
        try {
            const genres = await Genre.findAll({include : Movie})

            res.status(200).json(genres)
        } catch (error) {
            next(error)
        }
    }

    static async getOne(req,res,next){
        try {
            const {id} = req.params

            const genre = await Genre.findByPk(id)

            res.status(200).json(genre)
        } catch (error) {
            next(error)
        }
    }

    static async createGenre(req,res,next){
        try {
            const {name} = req.body

            const create = await Genre.create({name})

            res.status(201).json(create)
        } catch (error) {
            next(error)
        }
    }

    static async editGenre(req,res,next){
        try {
            const {name} = req.body
            const {id} = req.params
            const edit = await Genre.update({name},{ where : {id}})

            if(edit[0] == 0) throw {name : `failed_edit_genre`}
            res.status(200).json({msg : `Success to edit genre`})
        } catch (error) {
            next(error)
        }
    }

    static async deleteGenre(req,res,next){
        try {
            const {id} = req.params

            const delGenre = await Genre.destroy({where : {id}})
            
            res.status(200).json({msg : 'success to delete'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = GenreController