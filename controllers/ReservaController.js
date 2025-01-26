const prisma = require("../prisma/prismaClient");

class ReservaController {
    static async registrarReserva(req, res) {
        try {
            const { mesaId, n_pessoas, data } = req.body;

        // Validar os campos obrigatórios
        if (!mesaId || !n_pessoas || !data) {
            return res.status(400).json({
                    erro: true,
                    mensagem: "Os campos 'mesaId', 'n_pessoas' e 'data' são obrigatórios.",
                });
            } 

            const dataReserva = new Date(data);
            const hoje = new Date();

            // Verificar se a data da reserva é >= hoje
            if (dataReserva < hoje) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "A data da reserva não pode ser anterior à data atual.",
                });
            }

            // Buscar a mesa e verificar se ela já está reservada para a data selecionada
            const mesa = await prisma.mesa.findUnique({
                where: { id: mesaId },
                include: {
                    reservas: {
                        where: {
                            data: dataReserva,
                            status: true,
                        },
                    },
                },
            });

            if (!mesa) {
                return res.status(404).json({
                    erro: true,
                    mensagem: "A mesa selecionada não foi encontrada.",
                });
            }

            // Verificar se a mesa comporta o número de pessoas indicado
            if (n_pessoas > mesa.n_lugares) {
                return res.status(400).json({
                    erro: true,
                    mensagem: `A mesa selecionada comporta no máximo ${mesa.n_lugares} pessoas.`,
                });
            }

            // Verificar se a mesa está livre para a data selecionada
            if (mesa.reservas.length > 0) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "A mesa selecionada já está reservada para esta data.",
                });
            }

            // Criar a reserva no banco de dados
            await prisma.reserva.create({
                data: {
                    data: dataReserva,
                    n_pessoas: n_pessoas,
                    status: true,
                    usuario: {
                        connect: {
                            id: req.usuarioId, // Certifique-se de que o `usuarioId` está sendo passado corretamente
                        },
                    },
                    mesa: {
                        connect: {
                            id: mesaId,
                        },
                    },
                },
            });

            return res.status(201).json({
                erro: false,
                mensagem: "Reserva realizada com sucesso!",
            });
        } catch (err) {
            console.error("Erro ao registrar reserva:", err);

            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro ao cadastrar a reserva. Tente novamente mais tarde.",
            });
        }
    }
}

module.exports = ReservaController;
