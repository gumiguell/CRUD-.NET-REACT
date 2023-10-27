using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Aluno
    {
        public int id { get; set; }

        // [Required(ErrorMessage = "RA é um campo obrigatório.")]
        // [MaxLength(5, ErrorMessage = "RA deve ter no máximo 5 caracteres.")]
        public string ra { get; set; }

        // [Required(ErrorMessage = "Nome é um campo obrigatório.")]
        // [MaxLength(30, ErrorMessage = "Nome deve ter no máximo 30 caracteres.")]
        public string nome { get; set; }

        // [Required(ErrorMessage = "Código do curso é um campo obrigatório.")]
        // [MaxLength(2, ErrorMessage = "Código do curso deve ter no máximo 2 caracteres.")]
        public int codCurso { get; set; }

        public string link {get; set; }
    }
}
