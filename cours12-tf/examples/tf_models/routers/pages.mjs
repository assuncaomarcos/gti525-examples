import {Router} from 'express';

const router = new Router();

router.route('/')
    .get(async (req, res) => {
            res.render('pages/index')
    });

router.route('/inception')
    .get(async (req, res) => {
        res.render('pages/inception', {modelName: 'Inception v3'});
    });

router.route('/mobilenet')
    .get(async (req, res) => {
        res.render('pages/mobilenet', {modelName: 'MobileNet'});
    });

router.route('/mobilenet-ssd')
    .get(async (req, res) => {
        res.render('pages/mobilenet-ssd', {modelName: 'MobileNet SSD'});
    });

router.route('/coco-ssd')
    .get(async (req, res) => {
        res.render('pages/coco-ssd', {modelName: 'Coco SSD'});
    });


export default router;