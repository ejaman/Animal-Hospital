import { Router } from 'express';
import is from '@sindresorhus/is';
import { hospTagService } from '../services';
import {} from '../middlewares';

const hospTagRouter = Router();

hospTagRouter.get('/list', async (req, res, next) => {
  try {
    const hospTag = await hospTagService.findAll();

    res.status(200).json(hospTag);
  } catch (error) {
    next(error);
  }
});

hospTagRouter.get('/:hospTagId', async (req, res, next) => {
  try {
    const { hospTagId } = req.params;
    const hospTag = await hospTagService.findById(hospTagId);

    res.status(200).json(hospTag);
  } catch (error) {
    next(error);
  }
});

hospTagRouter.post('/', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { name, image } = req.body;

    if (!name) {
      throw new Error('이름은 필수로 입력하셔야 합니다.');
    }

    const createData = {
      ...(name && { name }),
      ...(image && { image }),
    };

    const newhospTag = await hospTagService.create(createData);

    res.status(201).json({ newhospTag, message: '생성되었습니다.' });
  } catch (error) {
    next(error);
  }
});

hospTagRouter.patch('/:hospTagId', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }
    const { hospTagId } = req.params;
    const { name, image } = req.body;

    const update = {
      ...(name && { name }),
      ...(image && { image }),
    };

    const updateHospTag = await hospTagService.update({
      hospTagId,
      update,
    });

    res.status(201).json({ updateHospTag, message: '수정되었습니다.' });
  } catch (error) {
    next(error);
  }
});

hospTagRouter.delete('/:hospTagId', async (req, res, next) => {
  try {
    const { hospTagId } = req.params;
    const deleteHospTag = await hospTagService.deleteById(hospTagId);
    res.status(201).json(deleteHospTag);
  } catch (error) {
    next(error);
  }
});

export { hospTagRouter };
