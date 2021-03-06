const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');
router.post('/', [
    check('nome','Nome é campo obrigatório.').trim().escape().notEmpty(),
    check('telefone').trim().escape().optional(),
    check('whatsapp').optional(),
    check('marca','Marca é um campo obrigatório.').trim().escape().notEmpty(),
    check('modelo','Modelo é um campo obrigatório.').trim().escape().notEmpty(),
    check('ano').trim().escape().optional(),
    check('placa', 'Placa é um campo obrigatório.').trim().escape().notEmpty(),
    check('data').custom(value => {
        var data = new Date(value);
        var data_atual = new Date();
       
        if(data.getDay()<5){
            if(data_atual.getFullYear()==data.getFullYear()){
                if(data_atual.getMonth()<data.getMonth()){
                    return true;
                } else if(data_atual.getMonth()>data.getMonth()){
                    return false;
                }

                if(data_atual.getMonth()==data.getMonth()){
                    if (data_atual.getDate()<data.getDate()+1){
                        return true;
                    } else return false;
                } else return false;
            } else if(data_atual.getFullYear()<data.getFullYear()){
                return true;
            } else return false;
        } else return false;
    }).withMessage('Selecione uma data válida.'),
    check('horario', 'Selecione um horário.').notEmpty()], (req, res) => {
        const erros = validationResult(req);
        const kilimpo = req.body;
        const contexto = {
            kilimpo: kilimpo,
            erros: erros.array()
        };
        if(!erros.isEmpty()) {
            return res.status(422).json(contexto);
        } else{
            return res.json(contexto);
        }
    }),

module.exports = router;