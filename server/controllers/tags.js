const models = require('../../db/models');

module.exports.addTag = (req, res) => {
  models.Tag.forge({
    name: req.body.name,
    profile_id: req.user.id,
    pageview_id: req.body.pageId,
  })
  .save()
  .then((tag) => {
    console.log('tag saved');
    console.log(tag);
    res.status(200).send(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
};

module.exports.removeTag = (req, res) => {
  models.Tag.where({
    id: req.body.tagId,
    name: req.body.name,
    profile_id: req.user.id,
    pageview_id: req.body.pageId,
  })
  .fetch()
  .then((tag) => {
    if (!tag) {
      throw new Error(`Tag ${req.body.name} not found`);
    } else {
      console.log('tag will be destroyed');
      return tag.destroy();
    }
  })
  .then(() => {
    // does anything need to be sent back here?
    // Or does store retain the info we need
    res.status(200).send(req.body);
  })
  .catch((err) => {
    console.log(`Error destorying ${req.body.name}.`);
    res.status(500).send(err);
  });
};
