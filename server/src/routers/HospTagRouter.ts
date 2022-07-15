import { Router } from 'express';
import * as _ from 'lodash';
import { hospTagService } from '../services';
import {} from '../middlewares';
import { upload } from '../utils';

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

hospTagRouter.post('/', upload.single('image'), async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    let image = '';
    if (req.file) {
      image = (req.file as Express.MulterS3.File).location;
    } else {
      if (_.isEmpty(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }
    }

    const { name } = req.body;

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

hospTagRouter.patch(
  '/:hospTagId',
  upload.single('image'),
  async (req, res, next) => {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      let image = '';
      if (req.file) {
        image = (req.file as Express.MulterS3.File).location;
      } else {
        if (_.isEmpty(req.body)) {
          throw new Error(
            'headers의 Content-Type을 application/json으로 설정해주세요'
          );
        }
      }
      const { hospTagId } = req.params;
      const { name } = req.body;

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
  }
);

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
