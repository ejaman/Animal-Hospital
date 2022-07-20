import { Router } from 'express';
import * as _ from 'lodash';
import { rezStatusService } from '../services';
import {} from '../middlewares';

const rezStatusRouter = Router();

rezStatusRouter.get('/list', async (req, res, next) => {
  try {
    const rezStatus = await rezStatusService.findAll();
    res.status(200).json(rezStatus);
  } catch (error) {
    next(error);
  }
});

rezStatusRouter.get('/:rezStatusId', async (req, res, next) => {
  try {
    const { rezStatusId } = req.params;
    const rezStatus = await rezStatusService.findById(rezStatusId);
    res.status(200).json(rezStatus);
  } catch (error) {
    next(error);
  }
});

rezStatusRouter.post('/', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (_.isEmpty(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { name } = req.body;
    const newRezStatus = await rezStatusService.create(name);
    res.status(201).json({ newRezStatus, message: '생성되었습니다.' });
  } catch (error) {
    next(error);
  }
});

rezStatusRouter.patch('/:rezStatusId', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (_.isEmpty(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }
    const { rezStatusId } = req.params;
    const { name } = req.body;
    const updateRezStatus = await rezStatusService.update({
      rezStatusId,
      update: { name: name },
    });
    res.status(201).json({ updateRezStatus, message: '수정되었습니다.' });
  } catch (error) {
    next(error);
  }
});

rezStatusRouter.delete('/:rezStatusId', async (req, res, next) => {
  try {
    const { rezStatusId } = req.params;
    const deleteRezStatus = await rezStatusService.deleteById(rezStatusId);
    res.status(201).json(deleteRezStatus);
  } catch (error) {
    next(error);
  }
});

export { rezStatusRouter };
