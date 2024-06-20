import express, { Request, Response, NextFunction} from 'express'


export const authication= ( req: Request, res: Response, next: NextFunction) => {

    const{ auth} = req.body

    //check if auth is valid

    if(auth !== 'vas') {
        res.status(400).json('Unauthorized')
        return
    }

    next()

}

