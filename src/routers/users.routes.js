import { Router } from "express";
import Users from "../dao/dtos/user.dto.js"

const usersRouter = Router();
const userService = new Users();

usersRouter.get("/premium", async (req, res) => {
    try {
        const user = await userService.getUser(req.user.email);
        if (req.user.rol === "premium") {
            user.rol = "user"
            user.save();
            res.send({message: "Rol updated"});
        } else {
            user.rol = "premium"
            user.save();
            res.send({message: "Rol updated"});
        }
    } catch (error) {
        req.logger.error(error);
        res.status(400).send({error});
    }
});

router.post('/:uid/documents', upload.array('documents'), async (req, res) => {
    const { uid } = req.params;
    const documents = req.files.map(file => ({
        name: file.originalname,
        path: file.path // Puedes guardar la ruta del archivo en la base de datos si es necesario
    }));

    try {
        // Actualizar el usuario con los documentos cargados
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        user.documents = documents;
        await user.save();

        res.json({ message: 'Documentos subidos correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.put('/premium/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
        const user = await user.findById(uid);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
      
        if (!user.isPremium) {            
            const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
            const hasRequiredDocuments = requiredDocuments.every(doc => user.documents.some(d => d.name === doc));
            if (!hasRequiredDocuments) {
                return res.status(400).json({ error: 'El usuario no ha terminado de procesar su documentación' });
            }
        }

        user.isPremium = true;
        await user.save();
        res.json({ message: 'Usuario actualizado a premium correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


export default usersRouter;