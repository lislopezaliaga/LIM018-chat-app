const getAllMessages = async (req, res) => {
  res.send('pedir tareas');
};

const createMessages = async (req, res) => {
  const { textMessage } = req.body;

  console.log(textMessage);

  res.send('creando tareas');
};

const deleteMessages = async (req, res) => {
  res.send('eliminar tareas');
};

const updateMessages = async (req, res) => {
  res.send('Actualizando tareas');
};

module.exports = {
  getAllMessages,
  createMessages,
  deleteMessages,
  updateMessages,
};
