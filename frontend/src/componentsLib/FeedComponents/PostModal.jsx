import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

function PostModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post Data:", form);
    setOpen(false);
    setForm({ title: "", description: "", image: null });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex justify-end gap-2 bg-amber-300 hover:bg-amber-400 transition px-6 py-2 rounded-lg font-semibold text-gray-900 shadow-md"
      >
        <Plus size={18} /> Create Post
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Create a Post
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Post title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write your thoughts..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none resize-none"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Image (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-600"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-300 hover:bg-amber-400 text-gray-900 font-semibold shadow-md"
                  >
                    Post
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PostModal;
