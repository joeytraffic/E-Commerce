const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // Find all tags
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find a single tag by its `id`
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
    } else {
      res.json(tag);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Create a new tag
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const [rowsAffected] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (rowsAffected === 0) {
      res.status(404).json({ message: "Tag not found" });
    } else {
      res.json({ message: "Tag updated successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Delete one tag by its `id` value
    const rowsAffected = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (rowsAffected === 0) {
      res.status(404).json({ message: "Tag not found" });
    } else {
      res.json({ message: "Tag deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
