﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Rucula.Domain;
namespace Rucula.Aplication;


public class LanguageService: ILanguageService
{
    private ILanguageRepository _languageRepository;
    private  readonly IMapper _mapper;
    public LanguageService(ILanguageRepository languageRepository, IMapper mapper)
    {
        _languageRepository = languageRepository;
        _mapper = mapper;
    }

    public  async Task<IEnumerable<LanguageDTO>> GetLanguageAsync()
    {
        var languages = _languageRepository.GetLanguageAsync();
        return _mapper.Map<IEnumerable<LanguageDTO>>(languages);
    }

    public async  Task<LanguageDTO> GetLanguageByIdAsync(int? id)
    {
       var languages = await _languageRepository.GetLanguageByIdAsync(id);
        return _mapper.Map<LanguageDTO>(languages);
    }

    public async  Task SaveAsync(LanguageDTO Language)
    {
    }

    public async  Task UpdateAsync(LanguageDTO Language)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(LanguageDTO Language)
    {
        throw new NotImplementedException();
    }
}
 