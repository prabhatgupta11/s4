
const { validationResult } = require('express-validator');
const net = require('net');


const validatorip = (req, res, next) => {
 
  if (!req.params.ip) {
    return res.status(400).json({ message: ' par miss' });
  }


  if (!net.isIP(req.params.ip)) {
    return res.status(400).json({ message: 'Invalid ' });
  }

  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Valierror', errors: errors.array() });
  }

  next();
};

module.exports = validatorip;
