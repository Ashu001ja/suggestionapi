const express=require('express');
const{getsuggestion,suggestionssend,suggestionupdate,suggestiondelete}=require('../controller/controller')
const router=express.Router();

router.route('/').get(getsuggestion);
router.route('/send').post(suggestionssend);
router.route('/update/:id').patch(suggestionupdate);
router.route('/delete/:id').delete(suggestiondelete);
module.exports=router;